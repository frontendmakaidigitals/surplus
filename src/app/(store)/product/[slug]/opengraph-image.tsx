import { ImageResponse } from "next/og";
import { formatMoney } from "@/lib/utils";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "";

// Replace this with your real data source
async function getProductBySlug(slug: string) {
  // Example mock data
  const products = [
    {
      slug: "example-product",
      name: "Example Product",
      price: 4999,
      currency: "USD",
      images: ["/products/example.jpg"],
      summary: "This is an example product.",
    },
  ];

  return products.find((p) => p.slug === slug) || null;
}

export default async function Image(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const geistRegular = fetch(
    new URL("./Geist-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const product = await getProductBySlug(params.slug);

  if (!product) {
    return null;
  }

  return new ImageResponse(
    (
      <div
        style={{ fontFamily: "Geist" }}
        tw="bg-neutral-100 w-full h-full flex flex-row items-stretch justify-center"
      >
        <div tw="flex-1 flex justify-center items-center">
          <div
            style={{
              backgroundImage: `url(${product.images?.[0] || ""})`,
              backgroundSize: "600px 630px",
              backgroundPosition: "center center",
              width: "600px",
              height: "630px",
              display: "flex",
            }}
          />
        </div>
        <div tw="flex-1 flex flex-col items-center justify-center border-l border-neutral-200">
          <div tw="w-full mt-8 text-left px-16 font-normal text-4xl">
            {"Your Next Store"}
          </div>
          <div tw="flex-1 -mt-8 flex flex-col items-start justify-center px-16">
            <p tw="font-black text-5xl mb-0">{product.name}</p>
            <p tw="font-normal text-neutral-800 mt-0 text-3xl">
              {formatMoney({
                amount: product.price,
                currency: product.currency,
              })}
            </p>
            <p tw="font-normal text-xl max-h-[7rem]">{product.summary || ""}</p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: await geistRegular,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
