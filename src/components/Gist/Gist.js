import React, { useEffect, useState } from 'react'
import './Gist.css';
const Gist = ({ gist }) => {
    const [gistData, setGistData] = useState(null);
    useEffect(() => {
        setGistData(gist)
    }, [gist])
    const renderGistFiles = () => {
        return Object.keys(gistData.files).map((filename) => {
            const fileContent = gistData.files[filename].content;
            return (
                <div key={filename}>
                    <h2>{filename}</h2>
                    <pre>{fileContent}</pre>
                </div>
            );
        });
    };
    return <>
        <div className="gist-card">
            {gistData && (
                <div className="gist-info">
                    <h1>{gistData.description}</h1>
                    <p>Created by {gistData.owner.login}</p>
                </div>
            )}
            <div className="files-container">
                {gistData && renderGistFiles()}
            </div>
        </div>
    </>
}

export default Gist
