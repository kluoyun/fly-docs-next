import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate>主控板</Translate>,
    Svg: require('@site/static/img/mainboard.png').default,
    url: '/docs/category/%E4%B8%BB%E6%9D%BF%E7%B1%BB',
    description: (
      <>
        <Translate>精确控制您的3D打印机核心，支持Klipper，RRF，Marlin等固件提供卓越的稳定性和兼容性，确保每次打印都完美无瑕。</Translate>
      </>
    ),
  }, {
    title: <Translate>上位机</Translate>,
    Svg: require('@site/static/img/sbc.png').default,
    url: '/docs/category/%E4%B8%8A%E4%BD%8D%E6%9C%BA%E7%B1%BB',
    description: (
      <>
        <Translate>作为3D打印机的大脑，上位机提供强大的数据处理能力和控制功能，确保高效高速精准的打印体验。</Translate>
      </>
    ),
  },
  {
    title: <Translate>工具头板</Translate>,
    Svg: require('@site/static/img/toolboard.png').default,
    url: '/docs/category/%E5%B7%A5%E5%85%B7%E6%9D%BF%E7%B1%BB',
    description: (
      <>
        <Translate>专为各种打印机型适配的高兼容工具头板，轻松连接CANBus，RS232，USB等通信协议，实现多样化打印。</Translate>
      </>
    ),
  },
  {
    title: <Translate>显示屏</Translate>,
    Svg: require('@site/static/img/screen.png').default,
    url: '/docs/category/%E6%98%BE%E7%A4%BA%E5%B1%8F%E7%B1%BB',
    description: (
      <>
        <Translate>高清触摸屏界面，直观操作，实时监控打印状态，无线多控群控让每个打印机尽在掌控。</Translate>
      </>
    ),
  }, {
    title: <Translate>扩展板 & 模块</Translate>,
    Svg: require('@site/static/img/extensionboard.png').default,
    url: '/docs/category/%E6%A8%A1%E5%9D%97--%E6%89%A9%E5%B1%95%E6%9D%BF%E7%B1%BB',
    description: (
      <>
        <Translate>增强您的3D打印机功能，轻松扩展连接更多传感器和附件，实现无限可能。</Translate>
      </>
    ),
  }, {
    title: <Translate>驱动</Translate>,
    Svg: require('@site/static/img/drive.png').default,
    url: '/docs/category/fly-%E9%A9%B1%E5%8A%A8%E7%B3%BB%E5%88%97',
    description: (
      <>
        <Translate>各种专业驱动器，优化打印机性能，提升打印精度和速度，为您的项目提供最佳支持。</Translate>
      </>
    ),
  },
];

function Feature({ Svg, title, url, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={url}><img href={url} src={Svg} className={styles.featureSvg} role="img" alt={title} /></a>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
