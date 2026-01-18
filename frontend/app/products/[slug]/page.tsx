import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCatalogPage } from "@/components/shared/product-catalog-page";
import { getCategoryBySlug, getProductsByCategory, getProductCategories } from "@/lib/data/products";
import { COMPANY } from "@/lib/constants";

// Data is cached with tags and revalidated on-demand when admin makes changes
// No time-based revalidation needed - updates are instant

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getProductCategories();
  return categories.map((category) => ({
    slug: category.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Ignore requests for static files (images, etc.)
  if (slug.includes('.')) {
    return { title: "Products | Rax Tech" };
  }

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Products | Rax Tech" };
  }

  return {
    title: `${category.title} Products | ${COMPANY.name}`,
    description: category.description,
  };
}

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params;

  // Ignore requests for static files (images, etc.)
  if (slug.includes('.')) {
    notFound();
  }

  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductCategories(),
  ]);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);

  // Separate regular products from customer usecases (for IoT category)
  const regularProducts = products.filter(p => !p.is_customer_usecase);
  const customerUsecases = products.filter(p => p.is_customer_usecase);

  return (
    <ProductCatalogPage
      category={category}
      products={regularProducts}
      customerUsecases={customerUsecases}
      allCategories={allCategories}
    />
  );
}
