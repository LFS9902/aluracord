import appConfig from '../../config.json'

export default function Title({ content, tag }) {
  const Tag = tag

  return (
    <>
      <Tag>
        {content}
      </Tag>

      <style jsx>{`
        ${Tag}{
          color: ${appConfig.theme.colors.primary['300']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}