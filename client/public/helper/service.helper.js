"use strict";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const generateFingerprint = async () => {
    const fpPromise = FingerprintJS.load();
    const fpInstance = await fpPromise;
  
    const result = await fpInstance.get();
  
    return result.visitorId;
  };