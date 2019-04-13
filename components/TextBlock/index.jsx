import ReactMarkDown from "react-markdown";
import classNames from "classnames/bind";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { GoArrowRight } from "react-icons/go";
import { renderActions } from "../Action";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

export const VARIANTS = { CALLOUT: "callout" };


const TextBlock = ({ title, content, actions, variant, headerAlign, textAlign = "left" }) => {
	const isCallout = variant === VARIANTS.CALLOUT;
	const component = (
		<div className={`${cx("textBlock", { callout: isCallout })} text-${textAlign}`}>
			<h2 className={`${styles.title} text-${headerAlign || textAlign}`}>{title}</h2>
			{Array.isArray(content)
				? (
					<Row>
						{content.map((col, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<Col key={i}>
								<ReactMarkDown
									source={col} />
							</Col>
						))}
					</Row>
				)
				: (
					<ReactMarkDown
						source={content}
					/>
				)}
			{actions && renderActions(actions, { variant: "text-primary", label: "Read More", icon: GoArrowRight() })}
		</div>
	);
	return isCallout ? (
		<Jumbotron className={styles.callout}>{component}</Jumbotron>
	) : (
		component
	);
};

export default TextBlock;
