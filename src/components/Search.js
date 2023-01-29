import "../App.css";
import { useState, useEffect } from "react";

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [documents, setDocuments] = useState([]);

    //Loading resumes 
    useEffect(() => {
        fetch('/api/resumes')
            .then(res => res.json())
            .then(docs => setDocuments(docs))
    }, []);

    return (
        <div className="App">
            <input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />
            <br />
            <br />
            {documents.filter(val => {
                if (searchTerm === "") {
                    return val;
                }
                // If resume contains any keyword from the search we will display it
                else if (val.text.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                }
            }).map((val, key) => {  // Using map to iterate all the resumes containing that key word
                return (
                    <div className="App" key={key}>
                        <h4>Resume {key + 1}</h4>
                        {val.text.split('\n').map(line => <p>{line}</p>)}
                        <br />
                    </div>)
            })}
        </div>
    )
}

export default Search;