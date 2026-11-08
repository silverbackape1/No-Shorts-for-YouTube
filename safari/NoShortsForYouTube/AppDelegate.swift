//
//  AppDelegate.swift
//  NoShortsForYouTube
//
//  macOS host app generated in the style of
//  `xcrun safari-web-extension-converter --macos-only`.
//

import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Running the host app once registers the embedded Safari Web Extension.
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

}
