const params = new URLSearchParams(location.search)
const query = params.get("query") ?? ""

document.getElementById("search-input").value = query

// oxlint-disable-next-line no-eval -- For demonstration.
eval("trackSearch('" + query + "')")

// oxlint-disable-next-line no-unused-vars -- For demonstration.
function trackSearch(term) {
  console.log("[analytics] search:", term)
}
