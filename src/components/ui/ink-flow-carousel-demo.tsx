"use client"

import * as React from "react"
import InkFlowCarousel, { type InkFlowItem } from "@/components/ui/ink-flow-carousel"

const W = 1600
const H = 1200
const CHALK = "#F2EEE6"
const INDIGO = "#1B2A6B"
const MADDER = "#B3261E"
const WELD = "#E8B516"
const VERDIGRIS = "#2F7F79"
const LAMP = "#141414"

type Ctx = CanvasRenderingContext2D

const disc = (c: Ctx, x: number, y: number, r: number, fill: string) => {
  c.fillStyle = fill
  c.beginPath()
  c.arc(x, y, r, 0, Math.PI * 2)
  c.fill()
}

function mark(c: Ctx, no: number, word: string, ink: string) {
  const spaced = c as Ctx & { letterSpacing?: string }
  c.fillStyle = ink
  c.textBaseline = "alphabetic"
  c.font = 'italic 400 26px Georgia, "Times New Roman", serif'
  c.fillText("Dye Works — No. 0" + no, 96, 196)
  c.font = '900 180px "Arial Black", "Helvetica Neue", Arial, sans-serif'
  spaced.letterSpacing = "-5.4px"
  c.fillText(word, 88, 1010)
  spaced.letterSpacing = "0px"
}

const POSTERS: { item: Omit<InkFlowItem, "src">; paint: (c: Ctx) => void }[] = [
  {
    item: { title: "Indigo", caption: "Shibori resist, twelve dips", alt: "White concentric rings on deep indigo" },
    paint: (c) => {
      c.fillStyle = INDIGO
      c.fillRect(0, 0, W, H)
      c.strokeStyle = CHALK
      c.lineWidth = 16
      for (let r = 70; r <= 470; r += 50) {
        c.beginPath()
        c.arc(1080, 600, r, 0, Math.PI * 2)
        c.stroke()
      }
      mark(c, 1, "Indigo", CHALK)
    },
  },
  {
    item: { title: "Madder", caption: "Root dye on raw cotton", alt: "A madder-red disc above red stripes on chalk" },
    paint: (c) => {
      c.fillStyle = CHALK
      c.fillRect(0, 0, W, H)
      disc(c, 1060, 540, 300, MADDER)
      c.fillStyle = MADDER
      for (let i = 0; i < 6; i++) c.fillRect(880, 900 + i * 26, 600, 12)
      mark(c, 2, "Madder", LAMP)
    },
  },
  {
    item: { title: "Weld", caption: "The dyer's rocket, mordanted with alum", alt: "A black diagonal band across saturated yellow" },
    paint: (c) => {
      c.fillStyle = WELD
      c.fillRect(0, 0, W, H)
      c.fillStyle = LAMP
      c.fill(new Path2D("M520 1200 L760 1200 L1600 360 L1600 120 Z"))
      disc(c, 430, 440, 92, LAMP)
      mark(c, 3, "Weld", LAMP)
    },
  },
  {
    item: { title: "Verdigris", caption: "Copper green, left to weather", alt: "A grid of chalk dots on copper green, one dot red" },
    paint: (c) => {
      c.fillStyle = VERDIGRIS
      c.fillRect(0, 0, W, H)
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 7; col++) {
          disc(c, 860 + col * 96, 330 + row * 96, 18, row === 2 && col === 4 ? MADDER : CHALK)
        }
      }
      mark(c, 4, "Verdigris", CHALK)
    },
  },
  {
    item: { title: "Lamp Black", caption: "Soot and gum, the oldest ink", alt: "A chalk arch over a yellow sun on black" },
    paint: (c) => {
      c.fillStyle = LAMP
      c.fillRect(0, 0, W, H)
      c.fillStyle = CHALK
      c.beginPath()
      c.arc(1060, 800, 380, Math.PI, 0)
      c.arc(1060, 800, 250, 0, Math.PI, true)
      c.closePath()
      c.fill()
      disc(c, 1060, 720, 70, WELD)
      mark(c, 5, "Lamp Black", CHALK)
    },
  },
]

function paintPosters(): InkFlowItem[] {
  const canvas = document.createElement("canvas")
  canvas.width = W * 2
  canvas.height = H * 2
  const c = canvas.getContext("2d")
  if (!c) return []
  return POSTERS.map(({ item, paint }) => {
    c.setTransform(2, 0, 0, 2, 0, 0)
    paint(c)
    return { ...item, src: canvas.toDataURL("image/png") }
  })
}

export default function InkFlowCarouselDemo() {
  const [items, setItems] = React.useState<InkFlowItem[]>([])
  React.useEffect(() => setItems(paintPosters()), [])
  return <InkFlowCarousel items={items} autoplay={3000} />
}
