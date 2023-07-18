import React, { Component } from 'react';
import LUXSelectField from 'luna-rocket/LUXSelectField';
import LUXButton from 'luna-rocket/LUXButton';
import LUXDialog from 'luna-rocket/LUXDialog';

const selectFieldDataObject = [
  { value: 0, text: '사장' },
  { value: 1, text: '부사장' },
  { value: 2, text: '전무' },
  { value: 3, text: '상무' },
  { value: 4, text: '이사' },
  { value: 5, text: '수석연구원' },
  { value: 6, text: '책임연구원' },
  { value: 7, text: '선임연구원' },
  { value: 8, text: '주임연구원' },
  { value: 9, text: '연구원' }
];

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultData: 1,
      dialogOpen: false
    };
  }

  handleChoiceDataObject = (value, text) => {
    console.log("SelectField: ", value, text);
    this.setState({ defaultData: value });
  };

  handleTouchTap = () => {
    LUXDialog.confirm('클릭 하시겠습니까?', {
      type: 'question',
      callback: () => { }
    })
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleOnReqeustClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleOnEscClose = () => {
    this.setState({ dialogOpen: false });
  };


  render() {
    const isDark = false;

    return (
      <>
        <LUXSelectField
          checkObjectList={true}
          selectFieldData={selectFieldDataObject}
          defaultData={this.state.defaultData}
          handleChoiceData={this.handleChoiceDataObject}
        />

        <LUXButton type="confirm" label="Confirm" />
        <LUXButton type="confirm" label="Confirm Blue" blue={true} onTouchTap={this.handleTouchTap} />

        <LUXButton label="Dialog" onTouchTap={this.handleDialogOpen} style={{ width: '80px', background: '#03A9F4', border: 'none', color: '#fff' }} />
        <LUXDialog onRequestClose={true} handleOnReqeustClose={this.handleOnReqeustClose} handleOnEscClose={this.handleOnEscClose} dialogOpen={this.state.dialogOpen} dialogButton={[
          <LUXButton label="취소" onTouchTap={this.handleDialogClose} style={{ width: '60px', height: '30px' }} />,
          <LUXButton label="확인" onTouchTap={this.handleDialogClose} style={{ width: '60px', height: '30px', marginLeft: '5px', background: '#03A9F4', border: 'none', color: '#fff' }} />
        ]}>
          {/* Dialog 콤포넌트에 대한 컨텐츠 요소가 들어가는 부분입니다. */}
          <div style={{ display: 'block', textAlign: 'left', color: isDark ? 'rgba(255, 255, 255, 0.87)' : '#000000' }}>
            <div>
              <h1 style={{ margin: 0, padding: '0 0 10px', fontSize: '22px', lineHeight: '26px', fontWeight: 'normal' }}>DIALOG TITLE</h1>
            </div>
            <div style={{ overflow: 'auto', maxHeight: '435px', padding: '20px 0 10px', borderTop: '1px solid #000' }}> {/* 내부 스크롤 생성 */}
              <div style={{ fontSize: '13px', lineHeight: '20px' }}>
                데이터 정보 팝업 크기 최대 800px 최소 340px 높이값 600px로 내부 스크롤 생성<br /><br />
                                데이터 영역 컨텐츠 제작 시작 div 영역 <strong style={{ color: '#1078e4' }}>dialog_data</strong> 기본<br />
                <strong>dialog_data_<span style={{ color: 'red' }}>ex)abc</span></strong> class 명을 추가하여 팝업 스타일링을 합니다<br /><br />
                                &lt;div class="<strong style={{ color: '#1078e4' }}>dialog_data</strong> <strong>dialog_data_<span style={{ color: 'red' }}>ex)abc</span></strong>" &gt;<br />
                                &nbsp; &nbsp; &nbsp; &lt;div class="dialog_data_tit &gt;<br />
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 팝업 타이틀 영역<br />
                                &nbsp; &nbsp; &nbsp; &lt;/div&gt;<br />
                                &nbsp; &nbsp; &nbsp; &lt;div class="dialog_data_area"&gt;<br />
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 팝업 컨텐츠 영역<br />
                                &nbsp; &nbsp; &nbsp; &lt;/div&gt;<br />
                                &lt;/div&gt;<br />
              </div>
            </div>
          </div>
        </LUXDialog>
      </>
    );
  }
}

Select.propTypes = {

};

export default Select;