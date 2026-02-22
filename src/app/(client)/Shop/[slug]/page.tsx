"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowLeft, ShoppingCart } from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { shopProducts } from "../data";

const formatPrice = (value: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);

const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} className="size-5 fill-amber-400 text-amber-400" />
      ))}
      {half ? (
        <Star className="size-5 fill-amber-400/60 text-amber-400" />
      ) : null}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} className="size-5 text-muted-foreground/40" />
      ))}
    </div>
  );
};

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = shopProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <Container className="py-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground"
        >
          Product not found.
        </motion.p>
        <Link href="/Shop" className="mt-4 inline-block text-primary hover:underline">
          Back to shop
        </Link>
      </Container>
    );
  }

  const inStock = product.stock > 0;

  return (
    <Container className="py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/Shop"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to shop
        </Link>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative aspect-square overflow-hidden rounded-xl bg-muted/50"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="object-cover"
            priority
          />
          {product.compareAtPrice != null && (
            <Badge variant="destructive" className="absolute left-4 top-4">
              Sale
            </Badge>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col"
        >
          {product.category && (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.category}
            </p>
          )}
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            {product.title}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <span className="text-2xl font-bold">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.compareAtPrice != null && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            )}
          </div>
          <p className="mt-4 text-muted-foreground">
            {inStock ? (
              <span className="text-green-600 dark:text-green-400">
                In stock — {product.stock} available
              </span>
            ) : (
              <span>Currently unavailable</span>
            )}
          </p>
          <p className="mt-4 text-foreground">{product.description}</p>
          <div className="mt-6 flex gap-3">
            <Button size="lg" className="gap-2" disabled={!inStock} asChild>
              <Link href={inStock ? "#" : undefined}>
                <ShoppingCart className="size-5" />
                Add to cart
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mt-12 border-t border-border pt-10"
      >
        <h2 className="text-xl font-semibold">Reviews ({product.reviews.length})</h2>
        <ul className="mt-4 space-y-4">
          {product.reviews.map((review, i) => (
            <li key={review.id}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="rounded-lg border border-border/80 bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <Stars rating={review.rating} />
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="mt-1 font-medium">{review.author}</p>
                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </motion.section>
    </Container>
  );
}
