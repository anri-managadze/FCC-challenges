import React, {useState} from 'react';

import './Previwer.css';
import marked from "marked";

const Previewer = () => {
    const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://lh3.googleusercontent.com/proxy/n1MdbShXt_FbJSoi9qox09cr0SmI8sT9X18dlgdrOl8UhbSpvOongvboeZ1ditE8uS8TQTVf2E1aNAxdupI8bl645QyT0zW_7jR0H24O8mbIOBK-jd4DUTHtOuv3c6JdAGjSZ1tNNm9MN6DiwV9MHKjYtA)
`
    const [state,setState]=useState(placeholder)


    return (
        <div className="container">
            <div className="form-group" id="input">
                <div className="d-flex justify-content-center title "><label htmlFor="text">Enter your Text here</label>
                </div>
                <textarea className="form-control" rows="8" id="editor" value={state}
                          onChange={(e) => setState(e.target.value)}/>
            </div>
            <div className="d-flex justify-content-center"><h4>And see your HTML appear here!</h4></div>
            <div className="border border-dark rounded" id="preview" dangerouslySetInnerHTML={{__html: marked(state)}} >

            </div>

        </div>
    );
};

export default Previewer;