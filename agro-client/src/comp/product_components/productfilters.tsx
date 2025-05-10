"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 50])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Filters</h3>
        <Button variant="outline" size="sm" className="w-full justify-start">
          Clear all filters
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "location"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="fruits" defaultChecked />
                <Label htmlFor="fruits" className="text-sm font-normal">
                  Fruits & Vegetables
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dairy" />
                <Label htmlFor="dairy" className="text-sm font-normal">
                  Dairy & Eggs
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="meat" />
                <Label htmlFor="meat" className="text-sm font-normal">
                  Meat & Poultry
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="grains" />
                <Label htmlFor="grains" className="text-sm font-normal">
                  Grains & Cereals
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="herbs" />
                <Label htmlFor="herbs" className="text-sm font-normal">
                  Herbs & Spices
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-1">
              <Slider
                defaultValue={[0, 50]}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <div className="rounded-md border px-2 py-1 text-sm">${priceRange[0]}</div>
                <div className="rounded-md border px-2 py-1 text-sm">${priceRange[1]}</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger className="text-base font-medium">Farm Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="california" defaultChecked />
                <Label htmlFor="lagos" className="text-sm font-normal">
                  California
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="oregon" />
                <Label htmlFor="oregon" className="text-sm font-normal">
                  Oregon
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="washington" />
                <Label htmlFor="washington" className="text-sm font-normal">
                  Washington
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="arizona" />
                <Label htmlFor="arizona" className="text-sm font-normal">
                  Arizona
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="texas" />
                <Label htmlFor="texas" className="text-sm font-normal">
                  Texas
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="farming">
          <AccordionTrigger className="text-base font-medium">Farming Method</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="organic" defaultChecked />
                <Label htmlFor="organic" className="text-sm font-normal">
                  Organic
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="conventional" />
                <Label htmlFor="conventional" className="text-sm font-normal">
                  Conventional
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hydroponic" />
                <Label htmlFor="hydroponic" className="text-sm font-normal">
                  Hydroponic
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="biodynamic" />
                <Label htmlFor="biodynamic" className="text-sm font-normal">
                  Biodynamic
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4">
        <Button className="w-full bg-green-600 hover:bg-green-700">Apply Filters</Button>
      </div>
    </div>
  )
}
