import { cn } from "@/utils/cn";
import React from "react";

import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Image from "next/image";

export function InfoGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto ">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          delay={i * 100}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "Unlock Your Potential: 5 Quick Workouts for Busy Days 💪",
    description: "Unlock Your Potential: 5 Quick Workouts for Busy Days 💪",
    header: (
      <Image
        height={1000}
        width={1000}
        src={"/workout.jpg"}
        alt="A cool image"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 object-cover"
      />
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Hidden Gems: Exploring Local Wonders Off the Beaten Path 🌍",
    description:
      "Discover the beauty that's right in your backyard! Uncover secret spots and lesser-known destinations that promise unforgettable adventures. #TravelLocal",
    header: (
      <Image
        height={1000}
        width={1000}
        src={"/travel.jpg"}
        alt="A cool image"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 object-cover"
      />
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Seasonal Recipes: Fall in Love with Autumn Flavors 🍁🍂",
    description:
      "From cozy soups to indulgent desserts, dive into the delicious world of autumnal cooking with these mouthwatering recipes. #FallFoodie",
    header: (
      <Image
        height={1000}
        width={1000}
        src={"/cooking.jpg"}
        alt="A cool image"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 object-cover"
      />
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Style Spotlight: Embrace Vintage Vibes with Modern Twists 👗✨",
    description:
      "Elevate your wardrobe with timeless pieces and contemporary flair! Discover how to seamlessly blend vintage aesthetics with current trends. #Vintage",
    header: (
      <Image
        height={1000}
        width={1000}
        src={"/cloth.jpg"}
        alt="A cool image"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 object-cover"
      />
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Tech Talk: Exploring the Future of Artificial Intelligence 🤖🔮",
    description:
      "From AI-powered assistants to cutting-edge robotics, dive into the fascinating world of artificial intelligence and its impact on our daily lives. #AIInnovation",
    header: (
      <Image
        height={1000}
        width={1000}
        src={"/tech.jpg"}
        alt="A cool image"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 object-cover"
      />
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Mindful Living: Small Changes, Big Impact 🌱✨",
    description:
      "Transform your life with simple yet powerful practices that promote mindfulness, gratitude, and overall well-being. Start your journey to a more balanced lifestyle today! #MindfulLiving",
    header: (
      <Image
        height={1000}
        width={1000}
        src={"/healthy.jpg"}
        alt="A cool image"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 object-cover"
      />
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Capturing the Magic: Mastering Night Photography 🌙📸",
    description:
      "Unlock the secrets to breathtaking night shots! Learn essential techniques and gear recommendations to capture stunning images after the sun sets. #NightPhotographyTips",
    header: (
      <Image
        height={1000}
        width={1000}
        src={"/photo.jpg"}
        alt="A cool image"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 object-cover"
      />
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
