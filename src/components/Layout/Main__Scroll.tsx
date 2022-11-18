import React, {useEffect, useRef, useState} from "react";
import "./Main__Scroll.scss"
import { VscTriangleUp } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';
import classNames from "classnames";

export function Main__Scroll () {
    const UP_THRESHOLD = 500;
    const FORGET_THRESHOLD = 2000;
    const BIG_HEADER = 50;

    let scrollWas = useRef(false);
    let lastPoint = useRef(0);
    let [arrowTopIsHidden, setArrowTopIsHidden] = useState(true);
    let [arrowBottomIsHidden, setArrowBottomIsHidden] = useState(true);

    function goTop() {
        lastPoint.current = window.scrollY;
        setArrowBottomIsHidden( false);
        scrollWas.current = true;
        window.scrollTo(window.scrollX , 0); //scroll event will arise automatically after this
    }

    function goBack () {
        window.scrollTo(window.scrollX, lastPoint.current);
    }

    function CalculateScroll() {
        setArrowTopIsHidden(window.scrollY < UP_THRESHOLD);
        setArrowBottomIsHidden(!((scrollWas.current) && (window.scrollY < BIG_HEADER)));
        if (scrollWas && (window.scrollY  > FORGET_THRESHOLD)) {
            scrollWas.current = false;
        }
    }

    function ScrollHandle() {
        let scrollWidth = Math.max(
            document.body.scrollWidth, document.documentElement.scrollWidth,
            document.body.offsetWidth, document.documentElement.offsetWidth,
            document.body.clientWidth, document.documentElement.clientWidth
        );
        if (scrollWidth > 768) {
            CalculateScroll();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', ScrollHandle);
    },[]);

    const arrowTopClass = classNames({
        "scroll-button": true,
        "hidden": arrowTopIsHidden,
    })
    const arrowBottomClass = classNames({
        "scroll-button": true,
        "hidden": arrowBottomIsHidden,
    })
    return (
        <div className="scroll">
            <div id="arrowTop" className={arrowTopClass} onClick={goTop}>
                <VscTriangleUp className="scroll-button__img"/>
            </div>
            <div id="arrowBottom" className={arrowBottomClass} onClick={goBack}>
                <VscTriangleDown
                     className="scroll-button__img scroll-button__img--down"/>
            </div>
        </div>
    )
}