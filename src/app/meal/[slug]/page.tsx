export default async function PageMeal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div>My Meal: {slug}</div>;
}
