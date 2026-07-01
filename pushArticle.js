import { connect } from "framer-api"
import "dotenv/config"

const PROJECT_URL = "https://framer.com/projects/systemlink-ch--uBqjKB1UwRvvI4kE4G4J-5jmTm"

async function pushArticle({
  slug,
  title,
  shortDescription,
  introHeader,
  content,
  articleType,
  date,
  mainImageUrl,
  authorName,
  authorRole,
  authorImageUrl,
}) {
  console.log(`Connecting to Framer...`)
  const framer = await connect(PROJECT_URL)
  console.log(`Connected.`)

  const collections = await framer.getCollections()
  const articles = collections.find(c => c.name === "Articles")

  console.log(`Pushing article: "${title}"...`)
  await articles.addItems([
    {
      slug,
      fieldData: {
        lykBqV4LS: { type: "string",        value: title },
        o4SXCAnQ0: { type: "string",        value: shortDescription },
        YjPZVq2pH: { type: "string",        value: introHeader },
        QRCJgS8I0: { type: "formattedText", value: content },
        uaSqZPqyE: { type: "enum",          value: articleType },
        fjIGNgJXm: { type: "date",          value: date },
        e2iT0TEOk: { type: "image",         value: mainImageUrl },
        Hvo4YvXge: { type: "string",        value: authorName },
        f3v9PL9tj: { type: "string",        value: authorRole },
        zBueKQ98m: { type: "image",         value: authorImageUrl },
      },
    },
  ])
  console.log(`Article added.`)

  console.log(`Publishing...`)
  await framer.publish()
  console.log(`Published live.`)

  await framer.disconnect()
}

await pushArticle({
  slug:             "test-article-1",
  title:            "Test Article",
  shortDescription: "This is a test article pushed via the Framer API.",
  introHeader:      "Welcome to the test",
  content:          "<p>This is the <strong>body content</strong> of the test article.</p>",
  articleType:      "bbYlKoiV1",
  date:             "2026-06-21",
  mainImageUrl:     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
  authorName:       "Test Author",
  authorRole:       "Writer",
  authorImageUrl:   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
})
