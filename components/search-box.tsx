import { FaSearch } from 'react-icons/fa';
import { useAllCategories } from '../react-query/query_hooks';
import { useStoreState } from '../state/store';
import { DetailedHTMLProps, FormEventHandler, FormHTMLAttributes, MouseEventHandler, useRef } from 'react';
import { useRouter } from 'next/router';
import { FiXCircle } from "react-icons/fi";
export default function SearchBox() {
  const { data: categories } = useAllCategories()
  const router = useRouter()
  const inputRef = useRef(null as any)
  const { topCategory, setTopCategory } = useStoreState();
  function handleTopCategoryChange(e: any) {
    setTopCategory(e.target.value);
  }
  function handleSearch(e: any) {
    e.preventDefault()
    const searchText = inputRef.current.value as string
    if (searchText) {
      if (!topCategory)
        router.push(`/?search=${searchText}`)
      else
        router.push(`/category/${topCategory}?search=${searchText}`)
    } else {
      if (!topCategory)
        router.push(`/`)
      else
        router.push(`/category/${topCategory}`)
    }
  }
  function handleClear() {
    inputRef.current.value = ""
  }
  return (
    <>
      <div className="search-box">
        <form className='search-form' onSubmit={handleSearch}>
          <button type="submit" onClick={handleSearch} className="search-button">
            <FaSearch color="#D8D8D8" size="15px" />
          </button>
          <input
            ref={inputRef}
            id="search"
            type="text"
            name="search"
            placeholder="Search goods"
          />
          <button type="submit" id='clear-button' onClick={handleClear}>
            <FiXCircle color="#989898" size="14px" />
          </button>
        </form>


        <select
          id="categories-search"
          name="categories-search"
          onChange={handleTopCategoryChange}
          value={topCategory}
        >
          <option value="" selected>
            All
          </option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      <style jsx>{`
        .search-box {
          width:100%;
          max-width:512px;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-left: 12px;
          padding-right: 12px;
          height: 42px;
          background: #ffffff;
          border: 2px solid #f5f5f5;
          box-sizing: border-box;
          border-radius: 4px;
        }
        .search-form{
          position:relative;
          flex-grow:1;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .search-box .search-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          height: 100%;
          cursor:pointer;
        }
        .search-box .search-button:focus {
          outline: none;
        }
        .search-box .search-button:hover {
          opacity: 40%;
        }
        .search-box input {
          width: 75%;
          height: 100%;
          border: none;
          padding-left: 8px;
        }
        .search-box input:focus {
          outline: none;
        }
        .search-box select {
          align-self: flex-end;
          max-width: 120px;
          height: 100%;
          text-transform: uppercase;
          font-style: normal;
          font-weight: 900;
          font-size: 10px;
          letter-spacing: 1px;
          color: #b2b2b2;
          border: none;
          background: none;
        }
        .search-box select:focus {
          outline: none;
        }
        #clear-button{
          position:absolute;
          right:5px;
          background: none;
          border: none;
          height: 100%;
          cursor:pointer;
        }
      `}</style>
    </>
  );
}
