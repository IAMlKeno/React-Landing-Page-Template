import React, { useEffect, useState } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string,
  completed: boolean;
}

export default function FilterAndSearch() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Todo[]>([]);
  const [displayedResults, setDisplayedResults] = useState<Todo[]>([]);

  useEffect(() => {
    fetchFromApi();
  }, []);

  useEffect(() => {
    const q: string = query;
    filterResults(q);
  }, [query]);

  const filterResults = (q: string): void => {
    if (q) {
      const newResults: Todo[] = results.filter((result: Todo) => result.title.includes(q));
      setDisplayedResults(newResults);
    } else {
      setDisplayedResults(results);
    }
  }

  const fetchFromApi = async (): Promise<void> => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setResults(json);
        setDisplayedResults(json);
      })
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setQuery('')
  }

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    if (value) {
      setQuery(value);
    }
  }

  return (<>
    <div id="fetch-filter-container" className="text-center practice-components">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>
            Fetch & Filter Data (Advanced)
          </h2>
          <div>
            <small>
              <ul>
                <li>
                  Goal: Fetch a list of items and allow the user to filter them.
                </li>
                <li>
                  Concepts Tested: useEffect, handling loading/error states, Array.prototype.filter().
                </li>
                <li>
                  Requirements: Fetch a list of users or products from a free API (e.g., JSONPlaceholder). Include a search input. As the user types, filter the displayed list in real-time. Using: <a href="https://jsonplaceholder.typicode.com/todos/">JSONPlaceholder API</a>
                </li>
              </ul>

            </small>
          </div>
        </div>
        <div className="row" style={{ border: "1px solid blue" }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '50%', margin: 'auto', border: '2px dashed purple'}}>
            <form id="fetch-filter-form" onSubmit={handleSubmit}>
              <div className="form-control">
                <label htmlFor="search">Search Input</label>
                <input type="text" name="search" placeholder="search" onChange={handleChange} value={query} />
              </div>
              <input type="submit" value={'Reset'} />
            </form>
          </div>
          <hr />
          <div className="results">
            {displayedResults.length > 0 &&
              (<ul>
                {displayedResults.map((result: Todo) => {
                  return (
                    <li key={result.id}>
                      <input type="checkbox" checked={result.completed} disabled />
                      &nbsp;
                      <span className="todo-title" data-complete={result.completed}>
                        {result.title}
                      </span>
                    </li>
                  )
                })}
              </ul>)
            }
            { displayedResults.length <= 0 && <span>No results</span> }
          </div>
        </div>
      </div>
    </div>
  </>)
}
