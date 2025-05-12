import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Intro from "../Intro/Intro";
import About from "../About/About";
import Skill from "../Skill/Skill";
import Project from "../Project/Project";
import Contact from "../Contact/Contact";
// import Contact from "../Contact/Contact";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main >
      <Intro></Intro>
      <About></About>
      <Skill></Skill>
      <Project></Project>
      <Contact></Contact>
      </main>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
