import React from 'react';
import AlphaPipelineStepper from './AlphaPipelineStepper.js';
import BetaPipelineStepper from './BetaPipelineStepper';
import GammaPipelineStepper from './GammaPipelineStepper';

export default function testSite() {
    return (
        <>
            <AlphaPipelineStepper />
            space
            <BetaPipelineStepper />
            space
            <GammaPipelineStepper />
        </>
    );
}
