module.exports = {
  parsers: {
    markdown: {
      parse: (text, parsers, options) => {
        // Convert indented code blocks to fenced code blocks
        const processedText = convertToCodeFences(text);

        // Return a simple AST structure that Prettier can work with
        return {
          type: "root",
          children: [
            {
              type: "text",
              value: processedText,
            },
          ],
        };
      },
      astFormat: "mdast",
      locStart: (node) => node.position?.start?.offset || 0,
      locEnd: (node) => node.position?.end?.offset || 0,
    },
  },
};

function convertToCodeFences(input) {
  let source = input;
  source = source.replace(/\n((\n+    [^\n]+)+)/g, (match) => {
    const dedented = match.replace(/\n    /g, "\n").trim();
    return "\n\n```\n" + dedented + "\n```";
  });
  return source;
}
