import React from "react";
import { DiJavascript1, DiCss3Full, DiHtml5, DiReact, DiJava, DiPython, } from "react-icons/di";
import { SiCplusplus, SiJava, SiPython, SiTypescript } from "react-icons/si"
import { GrDocumentTxt } from "react-icons/gr"
import styles from './FileIcons.module.css'

const FILE_ICONS = {
  js: <DiJavascript1 color="#ffffff" />,
  css: <DiCss3Full color="#ffffff" />,
  html: <DiHtml5 color="#ffffff" />,
  jsx: <DiReact color="#ffffff" />,
  java: <SiJava color="#ffffff" />,
  py: <SiPython color="#ffffff" />,
  cpp: <SiCplusplus color="#ffffff" />,
  ts: <SiTypescript color="#ffffff" />,
  txt: <GrDocumentTxt className={styles.txt_icon} size={13}/>
};

export default FILE_ICONS;
