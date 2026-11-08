//
//  SafariWebExtensionHandler.swift
//  NoShortsForYouTube Extension
//
//  Native-messaging stub required by Safari Web Extensions.
//  This extension does not send native messages; content scripts + CSS do the work.
//

import SafariServices
import os.log

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        let request = context.inputItems.first as? NSExtensionItem

        let profile: UUID?
        if #available(macOS 14.0, *) {
            profile = request?.userInfo?[SFExtensionProfileKey] as? UUID
        } else {
            profile = request?.userInfo?["profile"] as? UUID
        }

        let message: Any?
        if #available(macOS 11.0, *) {
            message = request?.userInfo?[SFExtensionMessageKey]
        } else {
            message = request?.userInfo?["message"]
        }

        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@ (profile: %@)", String(describing: message), profile?.uuidString ?? "none")

        let response = NSExtensionItem()
        if #available(macOS 11.0, *) {
            response.userInfo = [ SFExtensionMessageKey: [ "echo": message as Any ] ]
        } else {
            response.userInfo = [ "message": [ "echo": message as Any ] ]
        }

        context.completeRequest(returningItems: [ response ], completionHandler: nil)
    }

}
