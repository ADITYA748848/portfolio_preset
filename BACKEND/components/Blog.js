
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Blog(
    {
        _id
    }
) {

    const [redirect, setRedirect] = useState(false)

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [slug, setslug] = useState('');
    const [images, setimages] = useState('');
    const [description, setdescription] = useState('');
    const [blogcategory, setblogcategory] = useState('');
    const [tags, settags] = useState('');
    const [status, setstatus] = useState('');

    const [isUploading, setIsUploading] = useState(false)
    const uploadImagesQueue = [];

    async function createBlog(ev) {
        ev.preventDefault()

        if (isUploading) {
            await Promise.all(uploadImagesQueue)
        }

        const data = {title, slug, images, description, blogcategory, tags, status};

        if (_id) {
            await axios.put('/api/blogs', {...data, _id})
            toast.success('Data Updated')
            router.push('/blogs')
        }else{
            await axios.post('/api/blogs', data)
            toast.success('Blogs Created')
            router.push('/blogs')
        }


        setRedirect(true);
    };

    async function uploadImages(ev){
        
    }

    if (redirect) {
        router.push('/blogs')
        return null;
    }

    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-')

        setslug(newSlug);
    }


    return <>
        <form className='addWebsiteform' onSubmit={createBlog}>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Title</label>
                <input 
                type="text" 
                id='title' 
                placeholder='Enter small title' 
                value={title}
                onChange={ev => setTitle(ev.target.value)}
                />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="slug">Slug (seo friendly url)</label>
                <input 
                type="text" 
                id='slug' 
                placeholder='Enter Slug url' 
                value={slug}
                onChange={handleSlugChange}
                />
            </div>

            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="category">Select Category (for multi select prees ctr + mouse left key)</label>
                <select onChange={(e) => setblogcategory(Array.from(e.target.selectedOptions, option => option.value))} value={blogcategory} name="category" id="category" multiple>
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
                    <input type="file" id='fileInput' className='mt-1' accept='image/*' multiple />
                </div>
                <div className="w-100 flex flex-left mt-1">
                    <Spinner />
                </div>
            </div>
            <div className="description w-100 flex flex-col flex-left mb-2">
                <label htmlFor="description">Blog Content (for image: first upload and copy link and paste in ![alt text](link))</label>
                <MarkdownEditor

                value={description}
                onChange={(ev) => setdescription(ev.text)}

                    style={{ width: '100%', height: '400px' }}
                    renderHTML={(text) => (
                        <ReactMarkdown components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');

                                if (inline) {
                                    return <code>{children}</code>
                                } else if (match) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <pre style={{
                                                padding: '0', borderRadius: '5px', overflowX: 'auto',
                                                whiteSpace: 'pre-wrap'
                                            }} {...props}>
                                                <code>{children}</code>
                                            </pre>
                                            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() =>
                                                navigator.clipboard.writeText(children)
                                            }>copy code</button>
                                        </div>
                                    )
                                } else {
                                    return <code {...props}>{children}</code>
                                }
                            }
                        }}>
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="tags">Tags</label>
                <select onChange={(e) => settags(Array.from(e.target.selectedOptions, option => option.value))} value={tags} name="tags" id="tags" multiple>
                    <option value="html">html</option>
                    <option value="css">css</option>
                    <option value="javascript">javascript</option>
                    <option value="nextjs">nextjs</option>
                    <option value="reactjs">reactjs</option>
                    <option value="database">database</option>
                    <option value="kotlin">kotlin</option>
                    <option value="java">java</option>
                </select>
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="status"></label>
                <select onChange={ev => setstatus(ev.target.value)} value={status} name="status" id="status">
                    <option value="">No select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
            </div>

            <div className="w-100 mb-1">
                <button type='submit' className='w-100 addwebbtn flex-center'>SAVE BLOG</button>
            </div>
        </form>
    </>
}

