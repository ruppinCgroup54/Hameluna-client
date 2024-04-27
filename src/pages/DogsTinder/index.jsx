import React, { createRef, useMemo, useRef, useState } from "react";
import AdoptersLayout from "../../layouts/AdoptersLayout";
import Dogs from "../../Data/Dogs";
import DogCard from "./DogCard";

import TinderCard from "react-tinder-card";

import "./Tinder.css";

export default function DogsTinder() {
  const [currentIndex, setCurrentIndex] = useState(Dogs.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(Dogs.length)
        .fill(0)
        .map((i) => createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < Dogs.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < Dogs.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <AdoptersLayout>
      {Dogs.map((item,index)=><TinderCard
      key={item.numberId}
      ref={childRefs[index]}
      onSwipe={(dir) => swiped(dir, item.name, index)}
      onCardLeftScreen={() => outOfFrame(item.name, index)}
      className="swipe"
      
      >
        <DogCard dog={item} />
      </TinderCard>)}
    </AdoptersLayout>
  );
}
