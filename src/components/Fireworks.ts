import confetti from "canvas-confetti"

export default function launchFireworks(){

confetti({
particleCount:200,
spread:180,
origin:{y:0.6}
})

}