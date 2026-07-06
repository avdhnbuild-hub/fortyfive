'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAdminArticle, saveAdminArticle, uploadArticleCoverImage } from '@/lib/adminArticlesClient';
import { emptyArticle, slugify } from '@/lib/adminStore';

const categories = ['Startups', 'Technology', 'AI', 'Funding', 'Growth', 'Markets', 'India', 'Global', 'Opinion'];
const regions = ['India', 'Global', 'Both'];
const types = ['News', 'Analysis', 'Opinion', 'Deep Read', 'Funding'];
const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxImageSize = 2 * 1024 * 1024;

export default function ArticleForm({ articleId }) {
  const router = useRouter();
  const [article, setArticle] = useState({
    ...emptyArticle,
    date: new Date().toISOString().slice(0, 10),
  });
  const [ready, setReady] = useState(!articleId);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!articleId) return;

    getAdminArticle(articleId)
      .then((stored) => {
        if (stored) {
          setArticle({
            ...emptyArticle,
            ...stored,
            bodySections: stored.bodySections?.length ? stored.bodySections : emptyArticle.bodySections,
          });
        }
      })
      .catch((adminError) => setError(adminError.message))
      .finally(() => setReady(true));
  }, [articleId]);

  const updateField = (field, value) => {
    setArticle((current) => {
      const next = { ...current, [field]: value };
      if (field === 'title' && !current.slug) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const updateSection = (index, field, value) => {
    setArticle((current) => ({
      ...current,
      bodySections: current.bodySections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const addSection = () => {
    setArticle((current) => ({
      ...current,
      bodySections: [...current.bodySections, { heading: '', body: '' }],
    }));
  };

  const removeSection = (index) => {
    setArticle((current) => ({
      ...current,
      bodySections: current.bodySections.filter((_, sectionIndex) => sectionIndex !== index),
    }));
  };

  const selectCoverImage = (file) => {
    setError('');

    if (!file) {
      setImageFile(null);
      return;
    }

    if (!acceptedImageTypes.includes(file.type)) {
      setImageFile(null);
      setError('Cover image must be a JPG, PNG, or WebP file.');
      return;
    }

    if (file.size > maxImageSize) {
      setImageFile(null);
      setError('Cover image must be 2MB or smaller.');
      return;
    }

    setImageFile(file);
  };

  const uploadCoverImage = async () => {
    if (!imageFile) return;

    const nextSlug = article.slug || slugify(article.title);
    if (!nextSlug) {
      setError('Add a title or slug before uploading a cover image.');
      return;
    }

    setError('');
    setUploadingImage(true);

    try {
      const publicUrl = await uploadArticleCoverImage(imageFile, nextSlug);
      updateField('coverImageUrl', publicUrl);
      setImageFile(null);
    } catch (adminError) {
      setError(adminError.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const save = async (status) => {
    if (!article.title.trim()) return;
    setError('');

    try {
      const savedArticle = await saveAdminArticle({
        ...article,
        status,
        slug: article.slug || slugify(article.title),
      });
      router.push('/admin/articles');
      return savedArticle;
    } catch (adminError) {
      setError(adminError.message);
      return null;
    }
  };

  const preview = async () => {
    if (!article.title.trim()) return;
    setError('');

    try {
      const savedArticle = await saveAdminArticle({
        ...article,
        slug: article.slug || slugify(article.title),
      });
      router.push(`/admin/preview/${savedArticle.slug}`);
    } catch (adminError) {
      setError(adminError.message);
    }
  };

  if (!ready) return <p className="text-sm text-[#666666]">Loading article...</p>;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a1f]">Editor</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          {articleId ? 'Edit article' : 'Create article'}
        </h1>
      </div>

      <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title" value={article.title} onChange={(value) => updateField('title', value)} required />
          <Field label="Slug" value={article.slug} onChange={(value) => updateField('slug', slugify(value))} />
          <Field label="Subtitle" value={article.subtitle} onChange={(value) => updateField('subtitle', value)} multiline />
          <Field label="Summary" value={article.summary} onChange={(value) => updateField('summary', value)} multiline />
          <SelectField label="Category" value={article.category} options={categories} onChange={(value) => updateField('category', value)} />
          <SelectField label="Region" value={article.region} options={regions} onChange={(value) => updateField('region', value)} />
          <SelectField label="Type" value={article.type} options={types} onChange={(value) => updateField('type', value)} />
          <SelectField label="Status" value={article.status} options={['Draft', 'Published']} onChange={(value) => updateField('status', value)} />
          <Field label="Author" value={article.author} onChange={(value) => updateField('author', value)} />
          <Field label="Date" type="date" value={article.date} onChange={(value) => updateField('date', value)} />
          <Field label="Read time" value={article.readTime} onChange={(value) => updateField('readTime', value)} placeholder="6 min read" />
          <Field label="Tags" value={article.tags} onChange={(value) => updateField('tags', value)} placeholder="AI, SaaS, funding" />
          <Field label="Cover image URL" value={article.coverImageUrl} onChange={(value) => updateField('coverImageUrl', value)} />
          <Field label="OG image URL" value={article.ogImageUrl} onChange={(value) => updateField('ogImageUrl', value)} />
        </div>

        <section className="rounded-xl border border-[#e5e1da] bg-white p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold">Cover image</h2>
              <p className="mt-1 text-sm text-[#666666]">Upload a JPG, PNG, or WebP image up to 2MB.</p>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => selectCoverImage(event.target.files?.[0])}
                className="mt-4 block w-full text-sm text-[#666666] file:mr-4 file:rounded-lg file:border file:border-[#e5e1da] file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#070707] hover:file:border-[#ff5a1f]"
              />
              <button
                type="button"
                onClick={uploadCoverImage}
                disabled={!imageFile || uploadingImage}
                className="mt-4 h-11 rounded-lg border border-[#e5e1da] bg-white px-5 text-sm font-medium hover:border-[#ff5a1f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploadingImage ? 'Uploading...' : 'Upload image'}
              </button>
            </div>
            {article.coverImageUrl && (
              <div>
                <p className="text-sm font-medium">Preview</p>
                <Image
                  src={article.coverImageUrl}
                  alt=""
                  width={800}
                  height={450}
                  unoptimized
                  className="mt-3 aspect-[16/9] w-full rounded-lg border border-[#e5e1da] object-cover"
                />
              </div>
            )}
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="In brief" value={article.inBrief} onChange={(value) => updateField('inBrief', value)} multiline />
          <Field label="Pull quote" value={article.pullQuote} onChange={(value) => updateField('pullQuote', value)} multiline />
          <Field label="Bottom line" value={article.bottomLine} onChange={(value) => updateField('bottomLine', value)} multiline />
          <Field label="SEO title" value={article.seoTitle} onChange={(value) => updateField('seoTitle', value)} />
          <Field label="SEO description" value={article.seoDescription} onChange={(value) => updateField('seoDescription', value)} multiline />
        </div>

        <section className="rounded-xl border border-[#e5e1da] bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Body sections</h2>
              <p className="mt-1 text-sm text-[#666666]">Each body textarea can contain multiple paragraphs.</p>
            </div>
            <button type="button" onClick={addSection} className="rounded-lg border border-[#e5e1da] px-3 py-2 text-sm font-medium hover:border-[#ff5a1f]">
              Add section
            </button>
          </div>

          <div className="mt-5 space-y-5">
            {article.bodySections.map((section, index) => (
              <div key={index} className="rounded-lg border border-[#e5e1da] p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold">Section {index + 1}</p>
                  {article.bodySections.length > 1 && (
                    <button type="button" onClick={() => removeSection(index)} className="text-sm text-[#ff5a1f] hover:text-[#070707]">
                      Remove
                    </button>
                  )}
                </div>
                <div className="mt-4 space-y-4">
                  <Field label="Heading" value={section.heading} onChange={(value) => updateSection(index, 'heading', value)} />
                  <Field label="Body" value={section.body} onChange={(value) => updateSection(index, 'body', value)} multiline rows={6} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {error && <p className="text-sm text-[#ff5a1f]">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => save('Draft')} className="h-11 rounded-lg border border-[#e5e1da] bg-white px-5 text-sm font-medium hover:border-[#ff5a1f]">
            Save Draft
          </button>
          <button type="button" onClick={() => save('Published')} className="h-11 rounded-lg bg-[#070707] px-5 text-sm font-medium text-white hover:bg-[#ff5a1f]">
            Publish
          </button>
          <button type="button" onClick={preview} className="h-11 rounded-lg border border-[#e5e1da] bg-white px-5 text-sm font-medium hover:border-[#ff5a1f]">
            Preview
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, rows = 3, required = false, type = 'text', placeholder = '' }) {
  const sharedClass = 'mt-2 w-full rounded-lg border border-[#e5e1da] bg-white px-3 text-sm outline-none focus:border-[#070707]';

  return (
    <label className="block text-sm font-medium">
      {label}
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className={`${sharedClass} py-3`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          placeholder={placeholder}
          className={`${sharedClass} h-11`}
        />
      )}
    </label>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-lg border border-[#e5e1da] bg-white px-3 text-sm outline-none focus:border-[#070707]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
