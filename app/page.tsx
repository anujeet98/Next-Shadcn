import Link from "next/link";
import ProductCart from "./components/ProductCart";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Link href="/users">users</Link>
      <br></br>
      <ProductCart />
    </main>
  );
}
