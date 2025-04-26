import { scrapePrice } from "@/utils/helpers"
import { PriceUpdater } from "./PriceUpdater"

export default async function Price() {
  const price = await scrapePrice()
  return <PriceUpdater price={price} />
}