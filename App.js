import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./globalStyles";
import TicTacToe from "./TicTacToe/TicTacToe";
import StopWatch from "./StopWatch/StopWatch";
import FolderStructure from "./FolderStructure/FolderStructure";
import ProgressBar from "./ProgressBar/ProgressBar";
import Dialog from "./Dialog/Dialog";
import Autocomplete from "./Autocomplete/Autocomplete";
import Todo from "./Todo/Todo";
import Todo2 from "./Todo2/Todo2";
import Calculator from "./Calculator/Calculator";

export const StyledWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px;
  padding-bottom: 40px;
`;


export const StyledButton = styled.div`
  color: rgb(239, 241, 243);
  border: 1px solid rgb(139, 139, 139);
  background-color: rgb(138, 138, 141);
  padding: 8px;
  border-radius: 4px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default function App() {
  return (
    <Router>
      <GlobalStyle/>
      <div>
        <nav>
          <StyledWrapper>
            <StyledButton>
              <StyledLink to="/ticTacToe">Tic Tac Toe</StyledLink>
            </StyledButton>
            <StyledButton>
              <StyledLink to="/stopWatch">Stop Watch</StyledLink>
            </StyledButton>
            <StyledButton>
              <StyledLink to="/folderStructure">Folder Structure</StyledLink>
            </StyledButton>
            <StyledButton>
              <StyledLink to="/progressBar">Progress Bar</StyledLink>
            </StyledButton>
            <StyledButton>
              <StyledLink to="/dialog">Dialog</StyledLink>
            </StyledButton>
            <StyledButton>
              <StyledLink to="/autocomplete">Autocomplete</StyledLink>
            </StyledButton>
            <StyledButton>
              <StyledLink to="/todo">Todo</StyledLink>
            </StyledButton>
            <StyledButton>
              <StyledLink to="/todo2">Todo 2</StyledLink>
            </StyledButton>
            <StyledButton>
              <StyledLink to="/calculator">Calculator</StyledLink>
            </StyledButton>
          </StyledWrapper>
        </nav>
        
        <Routes>
          <Route path="/ticTacToe" element={<TicTacToe />}/>
          <Route path="/stopWatch" element={<StopWatch />}/>
          <Route path="/folderStructure" element={<FolderStructure />}/>
          <Route path="/progressBar" element={<ProgressBar />}/>
          <Route path="/dialog" element={<Dialog />}/>
          <Route path="/autocomplete" element={<Autocomplete />}/>
          <Route path="/todo" element={<Todo />}/>
          <Route path="/todo2" element={<Todo2 />}/>
          <Route path="/calculator" element={<Calculator />}/>
        </Routes>
      </div>
    </Router>
  );
}