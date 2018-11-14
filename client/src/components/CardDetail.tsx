import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { SFC } from 'react';
import { connect } from 'react-redux';
import {
  CardLocaleDataList,
  KeyWordLocaleDataList,
} from '../../../shared/ILocaleData';
import { IRootState } from '../reducers';
import {
  makeGetCardDetailByLocale,
  makeGetCategoryByLocale,
  makeGetkeywordInfoByLocale,
} from '../selectors';

const INFO_REG = new RegExp(/<keyword=(\w+)>(.+?)<\/keyword>/, 'gim');
const KEYWORD_REG = new RegExp(/<(.+?)>(.+?)<\/color>/, 'gim');

const styles = ({ palette }: Theme) =>
  createStyles({
    paper: {
      width: 400,
      padding: '20px 30px',
      fontSize: 14,
      zIndex: 101,
    },
    divider: {
      backgroundColor: palette.primary.main,
    },
  });
export interface ICardDetailProps extends WithStyles<typeof styles> {
  cardCategories?: string[];
  cardDetails?: CardLocaleDataList;
  cardId: string;
  categoryIds: string[];
  keywords: string[];
  keywordInfo?: KeyWordLocaleDataList;
  type: 'leader' | 'normal';
}
const highlight = (target: string, reg: RegExp) => {
  const newTarget = target.replace(reg, (substr, p1, p2) => {
    return `<strong style="color: #600101; font-weight: 900;">${p2}</strong>`;
  });
  return newTarget;
};
const CardDetail: SFC<ICardDetailProps> = ({
  cardCategories,
  cardDetails,
  cardId,
  classes,
  keywordInfo,
}) => {
  if (!cardDetails) {
    return null;
  }
  const { name, flavor, infoRaw } = cardDetails[cardId];
  return (
    <Paper className={classes.paper}>
      <Typography variant="display1" color="inherit">
        {name}
      </Typography>
      <Typography variant="subheading" color="inherit">
        {cardCategories &&
          cardCategories.map(category => (
            <span key={category}>{category}</span>
          ))}
      </Typography>
      <Typography variant="subtitle1" color="inherit">
        {flavor}
      </Typography>
      <p dangerouslySetInnerHTML={{ __html: highlight(infoRaw, INFO_REG) }} />
      {/* TODO: No keywords on mobile */}
      {keywordInfo && (
        <>
          <Divider className={classes.divider} />
          {Object.entries(keywordInfo).map(([key, keyword]) => (
            <p
              key={key}
              dangerouslySetInnerHTML={{
                __html: highlight(keyword.raw, KEYWORD_REG),
              }}
            />
          ))}
        </>
      )}
    </Paper>
  );
};

const makeMapStateToProps = () => {
  const getCardDetailByLocale = makeGetCardDetailByLocale();
  const getKeywordInfoByLocale = makeGetkeywordInfoByLocale();
  const getCardCategoryByLocale = makeGetCategoryByLocale();
  const mapState = (state: IRootState, props: ICardDetailProps) => ({
    cardDetails: getCardDetailByLocale(state),
    cardCategories: getCardCategoryByLocale(state, props),
    keywordInfo: getKeywordInfoByLocale(state, props),
  });
  return mapState;
};

export default withStyles(styles)(connect(makeMapStateToProps)(CardDetail));
