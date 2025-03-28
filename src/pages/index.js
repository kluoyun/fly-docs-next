import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl, {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import Slider from "react-slick";


function HeroBanner() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <Heading as="h1" className={styles.heroProjectTagline}>
          <img
            alt={translate({message: 'mellow logo'})}
            className={styles.heroLogo}
            src={useBaseUrl('/img/Mz.png')}
            width="300"
            height="300"
          />
          <span
            className={styles.heroTitleTextHtml}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: translate({
                id: 'homepage.hero.title',
                message:
                  '3D Mellow <b>专注于</b> 提供3D打印机 <b>全套</b> 解决方案',
                description:
                  'index title'
              }),
            }}
          />
        </Heading>
        <div className={styles.indexCtas}>
          <Link className="button button--primary" to="/docs/intro">
            <Translate>查看文档</Translate>
          </Link>
          <Link className="button button--info" to="https://3dmellow.com/">
            <Translate>3D Mellow Shop</Translate>
          </Link>
          <span className={styles.indexCtasGitHubButtonWrapper}>
            <iframe
              className={styles.indexCtasGitHubButton}
              src="https://ghbtns.com/github-btn.html?user=kluoyun&repo=fly-docs-next&type=star&count=true&size=large"
              width={160}
              height={30}
              title="GitHub Stars"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function TopBanner() {
  // TODO We should be able to strongly type customFields
  //  Refactor to use a CustomFields interface + TS declaration merging
  const announcedVersion = useDocusaurusContext().siteConfig.customFields
    ?.announcedVersion;

  return (
    <div className={styles.topBanner}>
      <div className={styles.topBannerTitle}>
        {'🎉\xa0'}
        <Link
          to="https://3dmellow.com/"
          className={styles.topBannerTitleText}>
          <Translate>
            {'Mellow Shop\xa0现已上线!️'}
          </Translate>
        </Link>
        {'\xa0🥳'}
      </div>
    </div>
  );
}

export default function Home() {
  const {
    siteConfig: {customFields, tagline},
  } = useDocusaurusContext();
  const {description} = customFields;
  return (
    <Layout title={tagline} description={description}>
      <main>
        <TopBanner />
        <HeroBanner />
        <div className={styles.section}>
          <HomepageFeatures />
        </div>
      </main>
    </Layout>
  );
}
