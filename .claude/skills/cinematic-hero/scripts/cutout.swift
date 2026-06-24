import Foundation
import Vision
import CoreImage
import AppKit

// Nutzung: swift cutout.swift <input> <output.png>
let args = CommandLine.arguments
guard args.count == 3 else { print("usage: cutout <in> <out>"); exit(1) }
let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])

guard let ciImage = CIImage(contentsOf: inputURL) else { print("cannot read input"); exit(1) }

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])
try handler.perform([request])

guard let result = request.results?.first else { print("no foreground found"); exit(1) }
let maskBuffer = try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
let maskImage = CIImage(cvPixelBuffer: maskBuffer)

let blend = CIFilter(name: "CIBlendWithMask")!
blend.setValue(ciImage, forKey: kCIInputImageKey)
blend.setValue(CIImage(color: .clear).cropped(to: ciImage.extent), forKey: kCIInputBackgroundImageKey)
blend.setValue(maskImage, forKey: kCIInputMaskImageKey)
let output = blend.outputImage!

let context = CIContext()
guard let png = context.pngRepresentation(of: output, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!) else {
  print("png encode failed"); exit(1)
}
try png.write(to: outputURL)
print("ok \(Int(output.extent.width))x\(Int(output.extent.height))")
