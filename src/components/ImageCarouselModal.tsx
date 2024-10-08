import React from "react";
import { Modal, Carousel } from "antd";

interface ImageCarouselModalProps {
  visible: boolean;
  onClose: () => void;
  images: string[];
}

const ImageCarouselModal: React.FC<ImageCarouselModalProps> = ({
  visible,
  onClose,
  images,
}) => {
  return (
    <Modal visible={visible} footer={null} onCancel={onClose} width={800}>
      <Carousel autoplay arrows dotPosition="bottom" infinite={true}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              height={40}
              width={700}
              alt={`Property Image ${index + 1}`}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </Carousel>
    </Modal>
  );
};

export default ImageCarouselModal;
