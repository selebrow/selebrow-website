import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Kubernetes backend',
    Svg: require('@site/static/img/kubernetes.svg').default,
    description: (
      <>
        Selebrow can run your browser tests in <Link to="/docs/start/kubernetes">Kubernetes</Link> clusters as well as
        locally using <Link to="/docs/start/docker">Docker</Link>.
      </>
    ),
  },
  {
    title: 'Playwright support',
    Svg: require('@site/static/img/playwright.svg').default,
    description: (
      <>
        Selebrow supports running <Link to="/docs/usage/playwright">Playwright</Link> tests in addition
        to various <Link to="/docs/usage/webdriver">Webdriver</Link> frameworks.
      </>
    ),
  },
  {
    title: 'GitLab CI integration',
    Svg: require('@site/static/img/gitlab.svg').default,
    description: (
      <>
        You can start Selebrow as a <Link to="/docs/start/gitlab-ci">GitLab service</Link> and get higher test parallelism.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
