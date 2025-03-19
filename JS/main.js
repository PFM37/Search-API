const axios = require("axios");

const SEARCH_API = "https://pfm-search.sytes.net/search?query=";

/**
 * Send search results to a website via POST request.
 * @param {string} webUrl - The target URL where results will be sent.
 * @param {Object} results - The search results to send.
 * @returns {Promise<void>}
 */
async function SendTo(webUrl, results) {
    try {
        const response = await axios.post(webUrl, { results });

        console.log("Response:", response.data);
        console.log("Request was successful");
    } catch (error) {
        console.error("Error sending results:", error.message);
    }
}

/**
 * Fetch search results in HTML format.
 * @param {string} query - The search query.
 * @returns {Promise<string>} - HTML formatted search results.
 */
async function html(query) {
    try {
        const response = await axios.get(`${SEARCH_API}${encodeURIComponent(query)}`);
        const results = response.data;

        let html = "<html><head><title>Search Results</title></head><body>";
        html += `<h1>Results for "${query}"</h1><ul>`;
        results.forEach(item => {
            html += `<li><a href="${item.url}">${item.title}</a> - ${item.content.slice(0, 100)}...</li>`;
        });
        html += "</ul></body></html>";

        return html;
    } catch (error) {
        return `<html><body><h1>Error fetching results</h1></body></html>`;
    }
}

/**
 * Fetch search results in plain text format.
 * @param {string} query - The search query.
 * @returns {Promise<string>} - Text formatted search results.
 */
async function text(query) {
    try {
        const response = await axios.get(`${SEARCH_API}${encodeURIComponent(query)}`);
        const results = response.data;

        let text = `Results for "${query}":\n\n`;
        results.forEach(item => {
            text += `Title: ${item.title}\nURL: ${item.url}\nSnippet: ${item.content.slice(0, 100)}...\n\n`;
        });

        return text;
    } catch (error) {
        return "Error fetching results";
    }
}

// Export functions as a module
module.exports = { html, text, SendTo };
