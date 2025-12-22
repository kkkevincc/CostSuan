import SearchInput from '@/components/SearchInput';
import styles from './page.module.css';

export default function HomePage() {
    return (
        <main className={styles.main}>
            <div className={styles.hero}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>💰</div>
                </div>

                <h1 className={styles.title}>
                    Price Autopsy
                    <span className={styles.subtitle}>价格解剖台</span>
                </h1>

                <p className={styles.description}>
                    用 AI 揭开产品定价的秘密
                    <br />
                    从原料到品牌，看清每一分钱都花在哪里
                </p>

                <SearchInput />

                <div className={styles.examples}>
                    <p className={styles.examplesLabel}>试试这些产品：</p>
                    <div className={styles.tags}>
                        <a href="/result?product=%E7%BA%A2%E4%B9%8B%E5%B0%8F%E4%BA%B2%E5%87%80%E6%B0%A8%E5%9F%BA%E9%85%B8%E6%B4%81%E9%9D%A2%E4%B9%B3" className={styles.tag}>
                            红之小亲净氨基酸洁面乳
                        </a>
                        <a href="/result?product=%E5%A7%8B%E7%A5%96%E9%B8%9FAtom%20LT%E8%BF%9E%E5%B8%BD%E5%A4%B9%E5%85%8B" className={styles.tag}>
                            始祖鸟Atom LT连帽夹克
                        </a>
                        <a href="/result?product=SK-II%E7%A5%9E%E4%BB%99%E6%B0%B4" className={styles.tag}>
                            SK-II神仙水
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
