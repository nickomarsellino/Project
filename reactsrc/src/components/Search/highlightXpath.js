import React from "react";
import "./highlight.css";

class HighlightXpath extends React.Component {
  render = () => {
    /**
     * This creates the regex to find the wanted `quote`.
     * If you want to highlight all the occurances of a `quote`, not
     * only the first occurance, add 'g' as the second parameter:
     * ex: const regex = new RegExp(`(${this.props.quote})`);
     * If you want to highlight multiple quotes from an array
     * you could do
     * const regex = new RegExp(`(${this.props.quotes.join('|')})`);
     */
    const regex = new RegExp(`(${this.props.quote})`);
    /**
     * In `content` we wrap `quote`'s occurance(s) in `em`s
     * with a class `highlighed`. Please note that this will
     * be rendered as html, not React, so `class` is used instead
     * of `className`.
     */
    const highlightedHtml = this.props.content.replace(
      regex,
      "<em class='highlighted'>$1</em>"
    );
    return (
      <div ref="test" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    );
  };
}

export default HighlightXpath;
