import React, { useEffect, useState } from 'react';
import { View, Dimensions, Image as ImageView, ScrollView } from 'react-native';
import { Button, TextInput, ProgressBar } from 'react-native-paper';
import { Image } from 'react-native-image-crop-picker';
import Geocoder from 'react-native-geocoding';
import GoogleAddressParser, { Address } from '../../utils/GoogleAddressParser';
import OkDialog from '../common/OkDialog';
import { Navigation } from 'react-native-navigation';
import useLocation from '../../hooks/utils/useLocation';
import useCreateLibrary from '../../hooks/libraries/useCreateLibrary';
import { Library, LibraryStatus } from '../../models/';
import { upload } from '../../utils/Images';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

type CreateLibraryProps = {
  image: Image;
};

const CreateLibrary = ({ image }: CreateLibraryProps): JSX.Element => {
  const win = Dimensions.get('window');
  const coords = useLocation();
  const { createLib, loading, error, finished } = useCreateLibrary();
  const [address, setAddress] = useState<Address | null>(null);
  const [dialogIsShowing, setDialogIsShowing] = useState<boolean>(false);

  useEffect(() => {
    if (finished) {
      setDialogIsShowing(true);
    }
  }, [finished]);

  useEffect(() => {
    //reverse geocode
    console.log({ coords });
    if (coords != null) {
      Geocoder.from(coords.latitude, coords.longitude)
        .then((json) => {
          const address = new GoogleAddressParser(json.results[0].address_components).result();
          setAddress(address);
        })
        .catch((error) => console.warn(error));
    }
  }, [coords]);

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <OkDialog
          visible={dialogIsShowing}
          title={error ? 'Epic Failure' : 'Great Success'}
          body={error ? `Please try again later.\n\n` : "We've received this library and will review it soon. Thanks!"}
          onDismiss={(): void => {
            Navigation.dismissAllModals();
          }}
        />
        <ImageView
          source={{ uri: image.path, width: image.width, height: image.height }}
          style={{ width: win.width, height: win.width, resizeMode: 'contain' }}
        />

        <TextInput
          style={{ backgroundColor: 'white', marginLeft: 24, marginRight: 24, marginTop: 32 }}
          label="Street Address"
          value={address?.address}
          mode="outlined"
          onChangeText={(text): void => {
            if (address == null) return;
            setAddress({ ...address, address: text ?? '' });
          }}
        />

        <TextInput
          style={{ backgroundColor: 'white', margin: 24 }}
          value={address ? `${address?.city}, ${address?.state}` : ''}
          disabled
          mode="outlined"
        />
        <Button
          style={{ width: '50%', margin: 24, alignSelf: 'center' }}
          contentStyle={{ height: 60 }}
          labelStyle={{ fontSize: 20, color: 'white' }}
          disabled={!address || loading}
          mode="contained"
          onPress={async () => {
            if (coords != null && address != null) {
              const avatarUuid = uuidv4();
              console.log('SEND IT!');

              const success = await upload(avatarUuid, image.path);

              if (!success) return;

              const lib = new Library({
                latitude: coords.latitude,
                longitude: coords.longitude,
                address: address.address,
                city: address.city,
                state: address.state,
                zip: address.zip,
                status: LibraryStatus.NEW,
                avatar: avatarUuid,
              });

              createLib(lib);
            }
          }}
        >
          Send it!
        </Button>
        {loading && <ProgressBar style={{ width: '50%', alignSelf: 'center' }} indeterminate />}
      </View>
    </ScrollView>
  );
};

CreateLibrary.options = {
  topBar: {
    title: {
      text: 'Create Library',
    },
  },
};

export default CreateLibrary;
