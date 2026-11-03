import AppKit
import Foundation
import Vision

// Read the top of a newspaper clipping. The Telegram caption is only the
// headline; the masthead on the image is the publisher.

func loadCG(_ path: String) -> CGImage? {
    let url = URL(fileURLWithPath: path)
    guard let img = NSImage(contentsOf: url),
          let tiff = img.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let cg = rep.cgImage else { return nil }
    return cg
}

func scaled(_ cg: CGImage, factor: Int) -> CGImage? {
    let width = cg.width * factor
    let height = cg.height * factor
    guard let ctx = CGContext(
        data: nil,
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: 0,
        space: CGColorSpaceCreateDeviceRGB(),
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else { return nil }
    ctx.interpolationQuality = .none
    ctx.draw(cg, in: CGRect(x: 0, y: 0, width: width, height: height))
    return ctx.makeImage()
}

func recognize(_ cg: CGImage) -> [String] {
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    request.recognitionLanguages = ["en-US"]
    let handler = VNImageRequestHandler(cgImage: cg, options: [:])
    try? handler.perform([request])
    return (request.results ?? []).compactMap { $0.topCandidates(1).first?.string }
}

let path = CommandLine.arguments.dropFirst().first ?? ""
guard let cg = loadCG(path) else {
    fputs("unreadable\n", stderr)
    exit(1)
}

let topHeight = max(1, Int(Double(cg.height) * 0.16))
if let top = cg.cropping(to: CGRect(x: 0, y: 0, width: cg.width, height: topHeight)),
   let big = scaled(top, factor: 3) {
    for line in recognize(big) {
        print(line)
    }
}

let midHeight = max(1, Int(Double(cg.height) * 0.34))
if let mid = cg.cropping(to: CGRect(x: 0, y: 0, width: cg.width, height: midHeight)) {
    for line in recognize(mid) {
        print(line)
    }
}
