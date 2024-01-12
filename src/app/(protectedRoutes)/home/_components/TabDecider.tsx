"use client"

import { useContext } from "react"
import { TabContext } from "../context/TabContextProvider"
import PostsRecommend from "./PostsRecommend";
import PostsFollowing from "./PostsFollowing";

export default function TabDecider() {
  const { tab } = useContext(TabContext);

    if (tab === "rec") {
        return <PostsRecommend />
    }

    if (tab === "fol") {
        return <PostsFollowing />;
    }
}
