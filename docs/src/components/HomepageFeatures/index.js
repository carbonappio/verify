import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/present.svg').default,
    description: (
      <>
        This library was created for everyone. With a very simple line of code, you can get started fetching data for Roblox Verification systems
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/analytics.svg').default,
    description: (
      <>
        This library makes you focus on only your project. We'll do the chores and give you the information nessecary without needing any other library for a smoother development process
      </>
    ),
  },
  {
    title: 'Get everything you want',
    Svg: require('@site/static/img/document.svg').default,
    description: (
      <>
        Only want to get the data for a specific service? We try our best to include every public API so that everyone can use it and feel at home, easily.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
