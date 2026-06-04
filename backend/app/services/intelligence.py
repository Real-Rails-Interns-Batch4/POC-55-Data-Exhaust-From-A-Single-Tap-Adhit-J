def build_sidebar_data():

    return {
        "title": "Data Exhaust from a Single Tap",

        "metric": {
            "partnersTouched": 5
        },

        "whyThisMatters":
        "A single tap can trigger multiple downstream data-sharing events across SDKs, ad networks, and analytics providers.",

        "whoControls":
        "Mobile platforms, analytics SDK providers, ad networks and data brokers influence how interaction data moves across the ecosystem.",

        "privacyImplications": [
            "Location exposure through third-party SDKs",
            "Device fingerprinting across advertising networks",
            "Behavioral profiling based on interaction patterns"
        ],

        "mitigationTips": [
            "Limit location permissions",
            "Disable ad personalization",
            "Review third-party app permissions",
            "Use privacy-focused alternatives when possible"
        ]
    }