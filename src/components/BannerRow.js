import React from 'react';
import { BannerRow, H2, Button } from '@appbaseio/designkit';

import { SecondaryLink } from '../styles';

export default () => (
    <BannerRow>
        <BannerRow.Column>
            <div>
                <H2 light>Build a live app in 5 minutes</H2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis vel nisi ac tincidunt. In vel egestas enim. In bibendum dui eget tristique maximus.</p>
                <div className="button-row">
                    <Button href="https://opensource.appbase.io/reactive-manual/getting-started/reactivesearch.html" bold uppercase big primary>Get Started</Button>
                    <SecondaryLink href="https://opensource.appbase.io/reactive-manual">Docs</SecondaryLink>
                </div>
            </div>
        </BannerRow.Column>
        <BannerRow.Column>
            <div>
                <H2 light>Work with us to build your app</H2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis vel nisi ac tincidunt. In vel egestas enim. In bibendum dui eget tristique maximus.</p>
                <div className="button-row">
                    <Button href="https://appbase.io/support" bold uppercase big dark><img src="/support.svg" style={{ marginRight: 8 }} alt="support"/> SUPPORT</Button>
                    <SecondaryLink href="/learn">Learn</SecondaryLink>
                </div>
            </div>
        </BannerRow.Column>
    </BannerRow>
);
