import React, { useEffect, useRef, useState } from "react";
import data from "./data";
import styled from "styled-components";

const StyledWrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
`;
const HiddenContainer = styled.div`
  opacity: 0;
  height: 0;
`;
const StyledListWrapper = styled.div`
  margin-top: 1px;
  width: 250px;
  text-align: left;
  border: 1px solid lightgray;
  max-height: 240px;
  overflow-y: scroll;
`;
const StyledList= styled.ul`
   padding-left: 0;
   margin-top: 0;
`;
const StyledListItem = styled.li`
    list-style: None;
    padding: 8px;
    &:hover {
      background-color: rgb(226, 225, 225);
    }
    background-color: ${({active}) => active ? "rgb(226, 225, 225)": "white"}
`;

const StyledInput = styled.input`
  width: 252px;
  height: 40px;
  border: 1px solid lightgray;
  padding: 0 8px;
  font-size: 16px;
  &:focus {
    border: 1px solid gray;
    outline: None;
  }
`;
const Container = styled.div`
  margin: auto;
  width: 202px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export default function Autocomplete () {
  const popupRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    let handler;
    if (popupRef && popupRef.current && isOpen) {
      const popUp = popupRef.current.getBoundingClientRect();
      handler = (e) => {
        const isInPopup =
          popUp.top - 36 <= e.clientY &&
          popUp.top + popUp.height >= e.clientY &&
          popUp.left <= e.clientX &&
          popUp.left + popUp.width >= e.clientX;
        if (!isInPopup) {
          setIsOpen(false);
        }
      };
      document.addEventListener("click", handler);
    }
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isOpen]);
  const fetchData = (value) => {
    if (value) {
      let newList = data.filter((d) => {
        return d.toLowerCase().startsWith(value.toLowerCase());
      });
      setList(newList);
    } else {
      setList(data);
    }
  };

  const onInputChange = (e) => {
    switch (e.key) {
      case "ArrowUp": {
        if (!isOpen) setIsOpen(true);
        if (active !== 0) setActive(active - 1);
        if (active === 0) setActive(list.length - 1);
        break;
      }
      case "ArrowDown": {
        if (!isOpen) {
          setIsOpen(true);
          setActive(0);
        } else if (active !== list.length - 1) setActive(active + 1);
        else if (active === list.length - 1) setActive(0);
        break;
      }
      case "Escape": {
        setActive(0);
        setIsOpen(false);
        break;
      }
      case "Enter": {
        setActive(0);
        setIsOpen(false);
        setSearch(list[active]);
        break;
      }
      case "Tab": {
        setActive(0);
        setIsOpen(true);
        break;
      }
      default: {
        setIsOpen(true);
        fetchData(e.target.value);
      }
    }
    const selected = popupRef?.current?.querySelector(".active");
    if (selected && selected?.scrollIntoView) {
      selected?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const onSelect = (selectedValue) => {
    setSearch(selectedValue);
    setIsOpen(false);
  };

  const debounce = (cb, delay = 0) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => cb.apply(this, args), delay);
    };
  };

  const debouncedInputHandler = debounce((e) => onInputChange(e), 500);

  return (
    <StyledWrapper>
      <Container>
        <StyledInput
          aria-label="Search Country"
          id="countries"
          type="search"
          role="combobox"
          autoComplete="off"
          aria-controls="country-list"
          aria-autocomplete="list"
          aria-haspopup={true}
          aria-expanded={isOpen}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search Country"
          onKeyUp={onInputChange}
          onFocus={() => {
            setIsOpen(true);
            setList(data);
          }}
        />
        {isOpen && (
          <StyledListWrapper ref={popupRef}>
            <StyledList role="listbox" id={"country-list"}>
              {list.map((li, idx) => {
                return (
                  <StyledListItem
                    key={li}
                    role={"option"}
                    tabIndex={-1}
                    aria-selected={active === idx}
                    onClick={() => {
                      onSelect(li);
                    }}
                    active={active === idx}
                    onKeyDown={() => onSelect(li)}
                  >
                    {li}
                  </StyledListItem>
                );
              })}
              {list.length === 0 && <span>No Match</span>}
              <HiddenContainer
                aria-live="polite"
                role="status"
              >{`${list.length} results available`}</HiddenContainer>
            </StyledList>
          </StyledListWrapper>
        )}
      </Container>
    </StyledWrapper>
  );
}
