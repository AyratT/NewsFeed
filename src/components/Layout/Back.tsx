import * as React from "react";
import styles from "./Back.module.scss"
import {BiArrowBack} from "react-icons/bi";
import {useContext} from "react";
import {siteContext} from "../../Context/SiteContext";
import {RiCloseCircleFill} from "react-icons/ri";

const Back = () => {
    const clearAll = useContext(siteContext).clearAll;
    const siteState = useContext(siteContext).siteState;
    const clearCategory = useContext(siteContext).clearCategory;
    const clearTag = useContext(siteContext).clearTag;
    const clearSearchPhrase = useContext(siteContext).clearSearchPhrase;
    const clearArticleToShow = useContext(siteContext).clearArticleToShow;

    return (
        <div className={styles.back}>
            <div onClick={clearAll} className={styles.back__container}>
                <div className={styles.back__iconWrapper}>
                    <BiArrowBack title="Go back"/>
                </div>
                <div className={styles.back__labelContainer}>
                    Go back
                </div>
            </div>
            <div className={styles.back__infoContainer}>
                {!!siteState?.category &&
                    <div onClick={clearCategory} className={styles.back__info}>
                        Current category: {siteState?.category} <RiCloseCircleFill/>
                    </div>}
                {!!siteState?.tag &&
                    <div onClick={clearTag} className={styles.back__info}>
                        Current tag: {siteState?.tag} <RiCloseCircleFill/>
                    </div>}
                {!!siteState?.search &&
                    <div onClick={clearSearchPhrase} className={styles.back__info}>
                        Current search: {siteState?.search} <RiCloseCircleFill/>
                    </div>}
                {!!siteState?.article &&
                    <div onClick={clearArticleToShow} className={styles.back__info}>
                        Selected suggested news <RiCloseCircleFill/>
                    </div>}
            </div>
        </div>
    )
}

export default Back