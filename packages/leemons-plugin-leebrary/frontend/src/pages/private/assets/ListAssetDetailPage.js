/* eslint-disable no-unreachable */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { isEmpty, isNil } from 'lodash';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useAcademicFiltersForAssetList from '@assignables/hooks/useAcademicFiltersForAssetList';
import useGetProfileSysName from '@users/helpers/useGetProfileSysName';
import { useIsStudent, useIsTeacher } from '@academic-portfolio/hooks';
import LibraryContext from '../../../context/LibraryContext';
import { useRequestErrorMessage } from '@common';
import { getAssetRequest } from '../../../request';
import { useLocale, useStore } from '@common';
import { ChatDrawerStyles } from '../../../../../comunica/src/components/ChatDrawer/ChatDrawer.styles';
import axios from 'axios';
import './style.css';
import download from '../../../../public/download.svg';
import {
  Box,
  LoadingOverlay,
  Stack,
  useResizeObserver,
  Grid,
  Textarea,
  IconButton,
  ContextContainer
} from '@bubbles-ui/components';
import {
  ChevronLeftIcon,
  PluginSettingsIcon,
  RemoveIcon,
  SendMessageIcon,
} from '@bubbles-ui/icons/outline';
import { LibraryDetail } from '@bubbles-ui/leemons';
import { addErrorAlert, addSuccessAlert } from '@layout/alert';
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
import { prepareAsset } from '../../../helpers/prepareAsset';
import { LibraryDetailPlayer } from '@bubbles-ui/leemons/es/library/LibraryDetailPlayer';
import { LibraryDetailContent } from '@bubbles-ui/leemons/es/library/LibraryDetailContent';
import Public from '../../../../../timetable/Public';
const ListAssetPage = () => {
  const { asset, setAsset } = useContext(LibraryContext);
  const { classes } = ChatDrawerStyles({}, { name: 'ChatDrawer' });
  const [currentAsset, setCurrentAsset] = useState(asset);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [assetType, setAssetType] = useState('');
  const [showPublic, setShowPublic] = useState(false);
  const [showPublished, setShowPublished] = useState(true);
  const history = useHistory();
  const params = useParams();
  const query = useQuery();
  const location = useLocation();
  const profile = useGetProfileSysName();
  const isStudent = useIsStudent();
  const isTeacher = useIsTeacher();
  const isAdmin = profile === 'admin';
  const academicFilters = useAcademicFiltersForAssetList({
    // hideProgramSelect: isStudent,
    useLabels: true,
  });

  // ·········································································
  // EFFECTS
  const loadAsset = async (id) => {
    try {
      const response = await getAssetRequest(id);
      if (!isEmpty(response?.asset)) {
        setAsset(prepareAsset(response.asset));
      } else {
        setAsset(null);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      addErrorAlert(getErrorMessage(err));
    }
  };

  useEffect(() => {

    if (!isEmpty(params.id) && asset?.id !== params.id) {
      loadAsset(params.id);

      const existingData = localStorage.getItem(params.id);
      const existingDataArray = existingData ? JSON.parse(existingData) : [];

      if (existingDataArray.length === 0) {
        const sentMessageText = {
          type: 'receiver',
          message: 'Welcome to your AI assistant, where you can ask questions if you have any while the course progresses.'
        };
        addMessage(sentMessageText);
      } else {
        // Add the existing chat messages to the state
        setChatMessages(existingDataArray);
      }


    }
  }, [params, asset]);




  const [, , , getErrorMessage] = useRequestErrorMessage();
  const [containerRef, containerRect] = useResizeObserver();
  const [loading, setLoading] = useState(true);
  const isEmbedded = useMemo(() => ['full']);
  const scrollRef = React.useRef();
  const [store, render] = useStore({
    showMembers: false,

  });

  const [chatMessages, setChatMessages] = useState([]);
  const addMessage = (message) => {
    setChatMessages((prevChatMessages) => [...prevChatMessages, message]);
  };

  useEffect(() => {
    localStorage.setItem(params.id, JSON.stringify([...chatMessages]));
  }, [chatMessages]);

  async function sendMessage() {
    try {
      if (store.newMessage && !store.sendingMessage) {
        const userMessage = store.newMessage;

        store.sendingMessage = true;
        const sentMessageText = {
          type: 'sender',
          message: store.newMessage
        }
        addMessage(sentMessageText);
        store.newMessage = '';

        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
            temperature: 0.7,

          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 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',
            },
          }
        );

        const reciveMessage = {
          type: 'receiver',
          message: response.data.choices[0].message.content
        }
        addMessage(reciveMessage);
        store.sendingMessage = false;

        render();
      }
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }

  }

  const toolbarItems = useMemo(
    () => ({

      toggle: false,
    }),
    [asset]
  );

  return (
    <Stack
      ref={containerRef}
      direction="row"
      fullWidth
      fullHeight
      style={{ position: 'relative' }}
    >
      <Box
        sx={(theme) => ({
          flex: 3,
          // position: 'relative',
          marginTop: theme.spacing[10],
          paddingRight: !isEmbedded && theme.spacing[5],
          paddingLeft: !isEmbedded && theme.spacing[5],
        })}
        skipFlex
      >
        <LoadingOverlay visible={loading} overlayOpacity={0} />

        {!loading && asset && (
          <ContextContainer>

            {/*   <LibraryDetail toolbarItems={toolbarItems} asset={asset} toolbar={null} /> */}
            <div className="chat_box_wrap">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-8">
                    <div className="chat_left">
                      <div className="vedio_box_outer">
                        <div className="vedio_box">
                          <video controls poster={asset.cover}>
                            <source src={asset.url} type="video/mp4" />
                          </video>
                        </div>

                        <h3>{asset.name}</h3>
                        <p>
                          {asset.description}
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </ContextContainer>
        )}


      </Box>
      <Box className={classes.wrapper} style={{ height: "690px" }} sx={(theme) => ({
        flex: 1,

        marginTop: theme.spacing[10],

        marginRight: theme.spacing[0],

     
        paddingLeft: !isEmbedded && theme.spacing[5],
        borderLeft: theme.spacing[0]
      })} skipFlex >
        <div class="sc-JrDLc cdetYU rsc-header"><h2 class="sc-fjvvzt jKClEA rsc-header-title">Chat</h2></div>
        <Box ref={scrollRef} className={classes.messages}>
          <div className="message_wrap">
            {chatMessages.map((message, index) => (
              <span className="message_body" key={index}>
                {message.type === 'sender' ? (
                  <p className="right_text message">
                    {message.message}

                  </p>
                ) : (<>
                  <div><img src={download} alt="Sample" style={{ height: "50px" }} /></div>
                  <div className="left_text message">
                    {message.message}

                  </div></>
                )}

              </span>
            ))}
            {store.sendingMessage && <><div><img src={download} alt="Sample" style={{ height: "50px" }} /></div> <div className="left_text message">Typing...</div></>}

          </div>
        </Box>
        <Box
          className={classes.sendMessage}
        >
          
          <Textarea value={store.newMessage}
            minRows={1}
            name="message"
            placeholder=""
            className={classes.textarea}
            onKeyPress={(e) => {
              if (e.code === 'Enter' || e.charCode === 13) {
                sendMessage();
                e.stopPropagation();
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              store.newMessage = e;
              render();
            }} />
          <IconButton
            onClick={sendMessage}
            icon={<SendMessageIcon />}
            color="primary"
            rounded
          />


        </Box>
      </Box>
    </Stack >
  )
};

export { ListAssetPage };
export default ListAssetPage;
