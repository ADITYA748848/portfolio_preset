
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';

export default function Blog() {



    return <>
        <form className='addWebsiteform'>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='Enter small title' />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="slug">Slug (seo friendly url)</label>
                <input type="text" id='slug' placeholder='Enter Slug url' />
            </div>

            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="category">Select Category (for multi select prees ctr + mouse left key)</label>
                <select name="category" id="category" multiple>
                    <option value="Naode Js">Node Js</option>
                    <option value="React js">React Js</option>
                    <option value="Next js">Next Js</option>
                    <option value="Css">Css</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Flutter Dev">Flutter Dev</option>
                    <option value="Deployment">Deployment</option>
                    <option value="Database">Database</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Java">Java</option>
                </select>
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100">
                    <label htmlFor="images">Image (first image will be show as thumbnail, you can drag)</label>
                    <input type="file" id='fileInput' className='mt-1' accept='image/*' multiple/>
                </div>
                <div className="w-100 flex flex-left mt-1">
                    <Spinner/>
                </div>
            </div>
            <div className="description w-100 flex flex-col flex-left mb-2">
                <label htmlFor="description">Blog Content (for image: first upload and copy link and paste in ![alt text](link))</label>
                <MarkdownEditor
                
                style={{width: '100%', height: '400px'}}
                renderHTML={(text) => (
                    <ReactMarkdown components={{
                        code : ({node, inline, className, children, ...props}) => {
                            const match = /language-(\w+)/.exec(className || '');

                            if (inline) {
                                return <code>{children}</code>
                            }else if (match) {
                                return (
                                    <div>

                                    </div>
                                )
                            }
                        }
                    }}>
                        {text}
                        </ReactMarkdown>
                )}
                />
            </div>
        </form>
    </>
}

