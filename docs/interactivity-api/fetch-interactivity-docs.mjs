import fs from "node:fs/promises"
import path from "node:path"
import {fileURLToPath} from "node:url"
import {JSDOM} from "jsdom"
import TurndownService from "turndown"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Output directory
const OUTPUT_DIR = path.join(__dirname, "docs")

// All Interactivity API pages we care about
// (from the Interactivity API Reference chapter list)
const pages = [
    {
        slug: "interactivity-api-reference",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/",
    },
    {
        slug: "core-concepts",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/",
    },
    {
        slug: "reactive-and-declarative-mindset",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/the-reactive-and-declarative-mindset/",
    },
    {
        slug: "global-state-local-context-derived-state",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/undestanding-global-state-local-context-and-derived-state/",
    },
    {
        slug: "server-side-rendering",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/server-side-rendering/",
    },
    {
        slug: "using-typescript",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/using-typescript/",
    },
    {
        slug: "quick-start-guide",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/iapi-quick-start-guide/",
    },
    {
        slug: "api-reference",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/",
    },
    {
        slug: "about-interactivity-api",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/iapi-about/",
    },
    {
        slug: "interactivity-api-faq",
        url: "https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/iapi-faq/",
    },
]

// Configure HTML → Markdown converter
const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
})

// Optional: tweak rules if you want, e.g. keep code fences nicer
turndown.addRule("preserveCodeBlocks", {
    filter: ["pre", "code"],
    replacement(content, node) {
        // If it's a <pre><code>...</code></pre>, turndown already does a decent job.
        // You can customize here if needed.
        return "\n\n```" + "\n" + node.textContent + "\n```\n\n"
    },
})

/**
 * Fetches a URL and returns its HTML as text.
 */
async function fetchHtml(url) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(
            `Failed to fetch ${url}: ${res.status} ${res.statusText}`
        )
    }
    return res.text()
}

/**
 * Extracts the main content area from the page (entry-content),
 * falls back to <main> or <article> if needed.
 */
function extractMainContent(html, url) {
    const dom = new JSDOM(html)
    const {document} = dom.window

    // Try the typical dev.wordpress.org article content wrapper
    let main =
        document.querySelector(".entry-content") ||
        document.querySelector("main") ||
        document.querySelector("article")

    if (!main) {
        console.warn(
            `Could not find main content for ${url}, falling back to <body>.`
        )
        main = document.body
    }

    // Remove nav / footer clutter inside the content if any sneaks in (optional)
    main.querySelectorAll("nav, .site-footer, .table-of-contents").forEach(
        (el) => el.remove()
    )

    // Grab title while we have the DOM
    const h1 = document.querySelector("h1")
    const title = h1 ? h1.textContent.trim() : "Untitled"

    return {mainHtml: main.innerHTML, title}
}

/**
 * Writes Markdown file with frontmatter + converted content.
 */
async function writeMarkdownFile(slug, url, title, markdown) {
    await fs.mkdir(OUTPUT_DIR, {recursive: true})

    const filename = path.join(OUTPUT_DIR, `${slug}.md`)

    const frontmatter = [
        "---",
        `title: "${title.replace(/"/g, '\\"')}"`,
        `source_url: "${url}"`,
        `fetched_at: "${new Date().toISOString()}"`,
        "---",
        "",
    ].join("\n")

    const fileContents = `${frontmatter}${markdown}\n`

    await fs.writeFile(filename, fileContents, "utf8")
    console.log(`✔ Wrote ${filename}`)
}

/**
 * Main runner: loops pages, fetches, converts, writes.
 */
async function run() {
    for (const page of pages) {
        const {slug, url} = page
        try {
            console.log(`Fetching ${url}...`)
            const html = await fetchHtml(url)

            const {mainHtml, title} = extractMainContent(html, url)

            // Convert HTML → Markdown
            const markdown = turndown.turndown(mainHtml)

            await writeMarkdownFile(slug, url, title, markdown)
        } catch (err) {
            console.error(`✖ Error processing ${url}:`, err.message)
        }
    }

    console.log("Done.")
}

run().catch((err) => {
    console.error("Fatal error:", err)
    process.exit(1)
})
