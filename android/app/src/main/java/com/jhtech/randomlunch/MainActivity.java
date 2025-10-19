package com.jhtech.randomlunch;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initialize Google Mobile Ads SDK
    MobileAds.initialize(this, initializationStatus -> {});

    // Load banner ad if present
    AdView adView = findViewById(R.id.adView);
    if (adView != null) {
      AdRequest adRequest = new AdRequest.Builder().build();
      adView.loadAd(adRequest);
    }
  }
}
